import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



class Category {
  constructor(id,title,color){
    this.id = id ;
    this.title = title ;
    this.id = color ;
  }
}

export default Category;

export const CATEGORIES = [
  new Category('c1','Difficulty levels','blue'),
  new Category('c2','Types of Words','red'),
  new Category('c3','Functional Uses','green'),
  new Category('c4','Idioms and Phrases','brown'),  
];


const styles = StyleSheet.create({})