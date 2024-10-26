import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <div>
      <form [formGroup]="form">
        <ng-container
          formArrayName="players"
          *ngFor="let player of playerInputs.controls; index as i"
        >
          <mat-form-field>
            <mat-label>Player {{ i + 1 }}</mat-label>
            <ng-container [formGroupName]="i">
              <input matInput formControlName="name" />
            </ng-container>
          </mat-form-field>
        </ng-container>
      </form>
    </div>
  `,
})
export class PlayerInputComponent implements OnInit {
  @Output() isFormValid = new EventEmitter<boolean>();
  @Input() players: Player[] = [];

  constructor(private formBuilder: FormBuilder) {}

  baseData = [
    { name: 'Sabine' } as PlayerFormData,
    { name: 'Ernst' } as PlayerFormData,
    { name: 'Franzi' } as PlayerFormData,
    { name: 'Hans' } as PlayerFormData,
    { name: 'Maja' } as PlayerFormData,
    { name: 'Hannah' } as PlayerFormData,
    { name: 'Johann' } as PlayerFormData,
    { name: 'Markus' } as PlayerFormData,
    { name: 'Manuel' } as PlayerFormData,
    { name: 'Frieda' } as PlayerFormData,
    { name: 'Mareike' } as PlayerFormData,
    { name: 'Patrick' } as PlayerFormData,
    { name: 'Robin' } as PlayerFormData,
    { name: 'Michelle' } as PlayerFormData,
    { name: 'Sebastian' } as PlayerFormData,
  ];

  form: FormGroup = this.formBuilder.group({
    players: this.formBuilder.array(
      this.baseData.map((player) => this.formBuilder.group(player)),
      [this.minimumTwoPlayersValidator]
    ),
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.isFormValid.emit(this.form.valid);
    });

    this.isFormValid.emit(this.form.valid);
  }

  ngOnDestory(): void {
    // todo: create unsub subject
    this.isFormValid.unsubscribe();
  }

  get playerInputs(): FormArray {
    return this.form.get('players') as FormArray;
  }

  addPlayer(): void {
    this.playerInputs.push(this.formBuilder.group({ name: '' }));
  }

  setPlayers(): void {
    this.playerInputs.controls.forEach((control) => {
      const name = control.value.name;
      if (name.trim().length) {
        this.players.push(new Player(control.value.name));
      }
    });
  }

  minimumTwoPlayersValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const formArray = control as FormArray;
    return formArray.length >= 2 ? null : { minPlayers: true };
  }
}

interface PlayerFormData {
  name: string;
}
