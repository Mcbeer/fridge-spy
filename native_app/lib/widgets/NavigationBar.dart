import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class NavigationBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Color.fromRGBO(48, 117, 215, 1),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          NavigationItem(),
          NavigationItem(),
          NavigationItem(),
          NavigationItem()
        ],
      ),
    );
  }
}

class NavigationItem extends StatelessWidget {
  final String title;

  NavigationItem({this.title = 'Nav item'});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(
        title,
        style: TextStyle(color: Colors.amber[50]),
      ),
    );
  }
}
