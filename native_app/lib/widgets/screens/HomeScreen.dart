import 'package:flutter/material.dart';
import '../shared/CustomCard.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      child: Column(
        children: [
          CustomCard(
            child: Text('My card text'),
          )
        ],
      ),
    );
  }
}
