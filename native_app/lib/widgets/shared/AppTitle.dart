import 'package:flutter/material.dart';

class AppTitle extends StatelessWidget {
  final String title = 'Fridge Spy';

  @override
  Widget build(BuildContext context) {
    return Text(
      title,
      style: TextStyle(
          color: Color.fromRGBO(255, 255, 255, 1),
          fontSize: 25,
          fontWeight: FontWeight.w700),
    );
  }
}
