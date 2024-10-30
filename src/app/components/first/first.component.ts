import { Component, OnInit } from '@angular/core';
import { FirstService } from '../../service/first.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  objects: any[] = []; // Lista de posts para mostrar
  objectToCreate = { title: '', body: '', userId: 1 }; // Ejemplo de objeto a crear

  constructor(private firstService: FirstService) { }

  ngOnInit(): void {
    this.getAllObjects(); // Al cargar el componente, obtenemos todos los posts
  }

  // Get all: Obtener todos los objetos
  getAllObjects(): void {
    this.firstService.getObjects().subscribe((data: any) => {
      this.objects = data;
      this.objects.forEach(object => object.isEditing = false);
      console.log('Objects:', this.objects);
    }, error => {
      console.error('Error al obtener los objetos:', error);
    });
  }

  // Create/Add: Agregar un nuevo objeto
  addObject(): void {
    this.firstService.createObject(this.objectToCreate).subscribe((data: any) => {
      console.log('Objeto agregado:', data);
      data.isEditing = false;
      this.objects.push(data);
      this.objectToCreate = { title: '', body: '', userId: 1 }; // Limpiar el formulario
    }, error => {
      console.error('Error al agregar el objeto:', error);
    });
  }

  // Delete: Eliminar un objeto
  deleteObject(id: number): void {
    this.firstService.deleteObject(id).subscribe(() => {
      console.log('Objeto eliminado');
      this.objects = this.objects.filter(object => object.id !== id);
    }, error => {
      console.error('Error al eliminar el objeto:', error);
    });
  }

  // Update: Actualizar un objeto existente 
  updateObject(object: any): void {
    this.firstService.updateObject(object).subscribe((data: any) => {
      console.log('Objeto actualizado:', data);
      object.isEditing = false;
    }, error => {
      console.error('Error al actualizar el objeto:', error);
    });
  }

  // Edit: Habilitar la edición de un objeto
  editObject(object: any): void {
    object.isEditing = true;
  }
}
