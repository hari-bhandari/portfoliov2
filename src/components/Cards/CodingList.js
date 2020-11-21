import {useState} from "react";

export const codeObject = {
    python: ['  class Person:', '    def __init__(self,name,dateOfBirth=2001):', '      self.name="Hari Bhandari"', '      self.age=datetime.datetime.now().year-dateOfBirth'],
    java: ['  public class Person:{', '    String final name;', '    int final dateOfBirth;', '    public Person(String name,int dateOfBirth){', '      this.name="Hari Bhandari";', '      this.dateOfBirth=Calendar.getInstance().get(Calendar.YEAR)-dateOfBirth}}'],
    js: ['  class Person{', '    constructor(name,dateOfBirth=2001){', '      this.name="Hari Bhandari"', '      this.age = new Date().getFullYear() - dateOfBirth','      }','  }']
}

