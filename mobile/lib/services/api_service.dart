import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String baseUrl = 'https://backend-tareas-dqhb.onrender.com';

  /// Registro de usuario
  static Future<bool> register(String username, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/register'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "username": username,
          "password": password,
        }),
      );
      return response.statusCode == 201;
    } catch (e) {
      print("Error en register: $e");
      return false;
    }
  }

  /// Login de usuario
  static Future<String?> login(String username, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "username": username,
          "password": password,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['access_token'];
      }
      return null;
    } catch (e) {
      print("Error en login: $e");
      return null;
    }
  }

  /// Obtener tareas
  static Future<List<dynamic>> getTasks(String token) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/tasks'),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      return [];
    } catch (e) {
      print("Error en getTasks: $e");
      return [];
    }
  }

  /// Crear tarea (título + descripción)
  static Future<bool> createTask(
      String title, String description, String token) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/tasks'),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
        body: jsonEncode({
          "title": title,
          "description": description.isEmpty ? "" : description, // ✅ fix
        }),
      );

      // ✅ aceptar 200 y 201 como válidos
      return response.statusCode == 200 || response.statusCode == 201;
    } catch (e) {
      print("Error en createTask: $e");
      return false;
    }
  }

  /// Editar/actualizar tarea (parcial)
  static Future<bool> updateTask(
      int id, Map<String, dynamic> data, String token) async {
    try {
      final response = await http.patch(
        Uri.parse('$baseUrl/tasks/$id'),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
        body: jsonEncode(data),
      );

      return response.statusCode == 200;
    } catch (e) {
      print("Error en updateTask: $e");
      return false;
    }
  }

  /// Eliminar tarea
  static Future<bool> deleteTask(int id, String token) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/tasks/$id'),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
      );

      // ✅ aceptar 200 o 204 como éxito
      return response.statusCode == 200 || response.statusCode == 204;
    } catch (e) {
      print("Error en deleteTask: $e");
      return false;
    }
  }
}

