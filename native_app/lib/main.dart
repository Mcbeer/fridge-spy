import 'package:flutter/material.dart';
import 'package:native_app/widgets/shared/AppTitle.dart';
import 'package:native_app/widgets/titleBar.dart';

void main() {
  runApp(FridgeMaterialScaffold());
}

class FridgeMaterialScaffold extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fridge App',
      home: Scaffold(
        appBar: TitleBar(
          child: AppTitle(),
          title: 'Fridge Spy App',
        ),
        // appBar: AppBar(
        //   title: AppTitle(),
        // ),
        body: Container(
          margin: EdgeInsets.all(20),
          child: Text(
            'Home',
            style: TextStyle(fontSize: 32, color: Colors.blue),
          ),
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
