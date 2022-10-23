import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Articulo } from 'src/app/interfaces/articulo.interface';
import { Clase } from 'src/app/interfaces/clase.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { Familia } from 'src/app/interfaces/familia.interface';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ClaseService } from 'src/app/services/clase.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FamiliaService } from 'src/app/services/familia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {

  public mostrarForm = false;

  public articuloForm = this.fb.group({
    sku: ["", [Validators.required, Validators.min(1)]],
    articulo: ["", Validators.required],
    marca: ["", Validators.required],
    modelo: ["", Validators.required],
    departamento: ["", Validators.required],
    clase: [{ value: "", disabled: true }, Validators.required],
    familia: [{ value: "", disabled: true }, Validators.required],
    stock: ["", Validators.required],
    cantidad: ["", Validators.required],
  }, {
    validators: this.cantidadStock('stock', 'cantidad')
  });

  public articulo: Articulo[] = [];
  public departamentos: Departamento[] = [];
  public clases: Clase[] = [];
  public familias: Familia[] = [];

  constructor(private fb: FormBuilder, private articuloServie: ArticuloService,
    private departamentoService: DepartamentoService, private claseService: ClaseService,
    private familiaService: FamiliaService) { }

  ngOnInit(): void {
  }

  campoNoValido(campo: string): boolean {
    // console.log(this.articuloForm.get(campo)?.errors?.['min']);

    return this.articuloForm.get(campo)!.invalid && this.articuloForm.get(campo)!.touched;
  }

  buscarSku() {    
    this.articuloForm.get('sku')?.markAllAsTouched();
    let sku = this.articuloForm.get('sku')?.value || "";
    if (!sku) {
      return;
    }
    this.mostrarForm = true;
    this.articuloServie.getArticulo(parseInt(sku))
      .subscribe(resp => {
        
        this.articulo = resp.articulo;
        console.log(this.articulo);
        this.getDepartamentos();
        if (this.articulo.length > 0) {
          this.articuloForm.get('sku')?.clearValidators();  
          this.cargarArticulo(this.articulo);
          this.getClasesByDepartamento(this.articulo[0].departamento_id);
          this.getFamiliasByClase(this.articulo[0].clase_id);
        } else {
          this.articuloForm.get('sku')?.setValidators([Validators.required, Validators.min(1)]);
          this.resetFormulario();
          this.articuloForm.get('sku')?.setValue(sku);
        }

      });
  }

  resetFormulario() {
    this.articuloForm.reset();
    this.articuloForm.get('departamento')?.setValue("");
    this.articuloForm.get('clase')?.setValue("");
    this.articuloForm.get('familia')?.setValue("");
    this.articuloForm.get('clase')?.disable();
    this.articuloForm.get('familia')?.disable();

  }

  cargarArticulo(articulo: Articulo[]) {
    let [articulo1] = articulo;
    this.articuloForm.reset({
      sku: articulo1.sku.toString(),
      articulo: articulo1.articulo,
      marca: articulo1.marca,
      modelo: articulo1.modelo,
      departamento: articulo1.departamento_id.toString(),
      clase: articulo1.clase_id.toString(),
      familia: articulo1.familia_id.toString(),
      stock: articulo1.cantidad.toString(),
      cantidad: articulo1.cantidad.toString(),
    });
  }

  getDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe(resp => {
      this.departamentos = resp.departamentos;
    });
  }

  cargarClases(event: Event) {
    this.articuloForm.get('clase')?.setValue("");
    let id_departamento = (event.target as HTMLSelectElement).value;
    if (!id_departamento) {
      this.clases = [];
      this.articuloForm.get('clase')?.disable();
      this.articuloForm.get('familia')?.disable();
      this.articuloForm.get('familia')?.setValue("");
      
      return;
    }
    this.getClasesByDepartamento(parseInt(id_departamento));
  }


  cargarFamilias(event: Event) {
    this.articuloForm.get('familia')?.setValue("");
    let id_familia = (event.target as HTMLSelectElement).value;
    if (!id_familia) {
      this.familias = [];
      this.articuloForm.get('familia')?.disable();
      return;
    }
    this.getFamiliasByClase(parseInt(id_familia));
  }

  getClasesByDepartamento(id: number) {
    console.log(id);

    this.claseService.getClasesByDepartamento(id).subscribe(resp => {
      this.clases = resp.clases;
      if (this.clases.length > 0) {
        this.articuloForm.get('clase')?.enable();
      }
    });
  }

  getFamiliasByClase(id: number) {
    this.familiaService.getFamiliasByClase(id).subscribe(resp => {
      console.log(resp);

      this.familias = resp.familias;
      if (this.familias.length > 0) {
        this.articuloForm.get('familia')?.enable();
      }
    });
  }

  guardarArticulo() {
    if (this.articuloForm.invalid) {
      return Object.values(this.articuloForm.controls).forEach(control => control.markAllAsTouched());
    }
    let data = this.articuloForm.value;
    this.articuloServie.postArticulo(data)
      .subscribe(resp => {
        if (resp.ok) {
          Swal.fire('Guardado', 'Articulo registrado correctamente', 'success');
          this.resetFormulario();
          this.mostrarForm = false;
        }

      });

  }

  actualizarArticulo() {    
    if (this.articuloForm.invalid) {
      return Object.values(this.articuloForm.controls).forEach(control => control.markAllAsTouched());
    }
    let data = this.articuloForm.value;
    this.articuloServie.updateArticulo(this.articulo[0].sku, data)
      .subscribe(resp => {
        console.log(resp);
        this.articuloForm.get('sku')?.setErrors({required: true});
        Swal.fire('Guardado', 'Articulo actualizado correctamente', 'success');
      });;
  }

  eliminarArticulo() {
    Swal.fire({
      title: '¿Estas seguro de eliminar el artículo?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.articuloServie.deleteArticulo(this.articulo[0].sku)
          .subscribe(resp => {
            console.log(this.articulo[0].sku);
            Swal.fire('Eliminado', 'Articulo eliminado correctamente', 'success');
            this.resetFormulario();
            this.mostrarForm = false;
          });
      }
    })
  }


  cantidadStock(stock: string, cantidad: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const d_stock = formGroup.get(stock);
      const d_cantidad = formGroup.get(cantidad);

      if (d_cantidad?.value <= d_stock?.value) {
        // d_cantidad?.setErrors(null);
        return null;
      } else {
        d_cantidad?.setErrors({ cantidadInvalid: true });
        return { cantidadInvalid: true }
      }
    }
  }

}
