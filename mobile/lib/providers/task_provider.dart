import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_service.dart';

class TaskProvider with ChangeNotifier {
  List<dynamic> _tasks = [];
  bool _isLoading = false;
  String? _token;
  String? _username;

  List<dynamic> get tasks => _tasks;
  bool get isLoading => _isLoading;
  String? get token => _token;
  String? get username => _username;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('token');
    _username = prefs.getString('username');
    debugPrint("🔄 init() -> token cargado: $_token, usuario: $_username");
    if (_token != null) {
      await loadTasks();
    }
  }

  Future<void> _saveAuthData(String token, String username) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
    await prefs.setString('username', username);
    _token = token;
    _username = username;
    debugPrint("💾 _saveAuthData() -> token guardado: $_token");
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('username');
    _token = null;
    _username = null;
    _tasks = [];
    debugPrint("🚪 logout() -> sesión cerrada");
    notifyListeners();
  }

  Future<bool> register(String username, String password) async {
    try {
      final success = await ApiService.register(username, password);
      if (success) {
        return await login(username, password);
      }
      return false;
    } catch (e) {
      debugPrint("Error al registrar: $e");
      return false;
    }
  }

  Future<bool> login(String username, String password) async {
    try {
      final token = await ApiService.login(username, password);
      if (token != null) {
        debugPrint("🔐 login() -> token recibido: $token");
        await _saveAuthData(token, username);
        await loadTasks();
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      debugPrint("Error al iniciar sesión: $e");
      return false;
    }
  }

  Future<void> loadTasks() async {
    if (_token == null) {
      debugPrint("⚠️ loadTasks() -> no hay token");
      return;
    }
    _isLoading = true;
    notifyListeners();

    try {
      _tasks = await ApiService.getTasks(_token!);
      debugPrint("📋 loadTasks() -> ${_tasks.length} tareas cargadas");
    } catch (e) {
      debugPrint('Error al cargar tareas: $e');
      _tasks = [];
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<bool> createTask(String title, String description) async {
    if (_token == null) {
      debugPrint("❌ createTask() -> No hay token");
      return false;
    }
    try {
      final success = await ApiService.createTask(title, description, _token!);
      if (success) {
        await loadTasks();
      }
      return success;
    } catch (e) {
      debugPrint("Error al crear tarea: $e");
      return false;
    }
  }

  Future<bool> updateTask(int id, Map<String, dynamic> data) async {
    if (_token == null) return false;
    try {
      final success = await ApiService.updateTask(id, data, _token!);
      if (success) {
        await loadTasks();
      }
      return success;
    } catch (e) {
      debugPrint("Error al editar tarea: $e");
      return false;
    }
  }

  Future<bool> deleteTask(int id) async {
    if (_token == null) return false;
    try {
      final success = await ApiService.deleteTask(id, _token!);
      if (success) {
        await loadTasks();
      }
      return success;
    } catch (e) {
      debugPrint("Error al eliminar tarea: $e");
      return false;
    }
  }
}



