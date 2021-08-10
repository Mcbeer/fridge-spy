import 'package:flutter/material.dart';
import 'package:native_app/widgets/screens/HomeScreen.dart';
import 'package:native_app/widgets/shared/AppTitle.dart';

void main() {
  // Stops the harsh lines in gradients
  Paint.enableDithering = true;
  runApp(FridgeMaterialScaffold());
}

class FridgeMaterialScaffold extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fridge App',
      home: Scaffold(
        appBar: AppBar(
          title: AppTitle(),
        ),
        body: Container(
          margin: EdgeInsets.all(20),
          child: HomeScreen(),
        ),
        bottomNavigationBar: BottomNavigationBar(
          backgroundColor: Colors.white,
          items: [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
            BottomNavigationBarItem(
                icon: Icon(Icons.camera_alt), label: 'Scan'),
            BottomNavigationBarItem(
                icon: Icon(Icons.settings), label: 'Settings'),
          ],
        ),
      ),
    );
  }
}
