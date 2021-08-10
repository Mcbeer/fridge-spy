import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class TitleBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final Widget child;

  @override
  final Size preferredSize;

  TitleBar({
    this.title = 'Fridge Spy',
    required this.child,
  }) : preferredSize = Size.fromHeight(80.0);

  final ShapeBorder kBackButtonShape = RoundedRectangleBorder(
    borderRadius: BorderRadius.only(
      topRight: Radius.circular(30),
    ),
  );

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        margin: EdgeInsets.all(10),
        padding: EdgeInsets.all(10),
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: Color.fromRGBO(48, 117, 215, 1)),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [child],
          mainAxisAlignment: MainAxisAlignment.start,
        ),
      ),
    );
  }
}
