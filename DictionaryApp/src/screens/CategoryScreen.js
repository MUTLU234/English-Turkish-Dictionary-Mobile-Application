import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



class Category {
  constructor(id,title,color){
    this.id = id ;
    this.title = title ;
    this.id = color ;
  }
}
export default function CategoryScreen(){
  function renderCategoryItem(itemData){
  console.log(itemData.item);}
}

export default Category;

export const CATEGORIES = [
  new Category('c1','Difficulty levels','red'),
  new Category('c2','Types of Words','blue'),
  new Category('c3','Functional Uses','brown'),
  new Category('c4','Idioms and Phrases','green'),  
];


const styles = StyleSheet.create({})