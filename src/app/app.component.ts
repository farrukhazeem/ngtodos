import { Component } from '@angular/core';
//import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todosRef: AngularFireList<any>;
  currentTodo: FormGroup;
  todos: Observable<any[]>;
  editTodos = { title: '', description: '' };
  editMode = false;
  currentTodoKey;

  constructor(private _FormBuilder: FormBuilder, private db: AngularFireDatabase) {
    this.todosRef = db.list('todos');
    this.currentTodo = _FormBuilder.group({
      'title': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])]
    });
    this.todos = this.todosRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
   // db.list('/todos').snapshotChanges();
  }

 addTodo(todo) {
  this.db.list('/todos').push(todo);
 
 //  addTodo(title: String) {
    // this.todosRef.push({text: title});

}

  deleteTodo(key: string) {
    // console.warn(todo)
    // const promise = this.db.object(`todos/${todo.key}`).remove();
    // promise.then(_ => console.log('success'))
    //   .catch(err => console.log(err, 'You dont have access!'));
      this.todosRef.remove(key);
  }

  editTodo(todo){
      this.todos.forEach((todo) => {
        console.log(todo);
      })
  }
}
