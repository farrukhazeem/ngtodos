import { Component } from '@angular/core';
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
  editTodos = { key: '', title: '', description: '' };
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
  }

 addTodo(todo) {
  this.db.list('/todos').push(todo);
  this.currentTodo.reset();
}

  deleteTodo(key: string) {
    this.todosRef.remove(key);
  }

  editTodo(todo){
    this.editMode = true;
    this.editTodos = { key: todo.key, title: todo.title, description: todo.description };
  }

  cancelEdit() {
    this.editMode = false;
  }

  updateEditedTodo() {
    const editedTodo = this.editTodos;
    this.todosRef = this.db.list('todos');
    this.todosRef.set(editedTodo.key, {title: editedTodo.title, description: editedTodo.description} );
    this.editMode = false;
  }
  
}
