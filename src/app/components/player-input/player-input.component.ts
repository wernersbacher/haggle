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
      <form [formGroup]="form!">
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
  @Input() minPlayerNumber = 2;
  @Input() defaultNames: string[] = [];

  constructor(private formBuilder: FormBuilder) {}

  minimumTwoPlayersValidator = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const formArray = control as FormArray;
    const nonEmptyNamesCount = formArray.controls.filter(
      (control) => control.value.name.trim().length > 0
    ).length;
    return nonEmptyNamesCount >= this.minPlayerNumber
      ? null
      : { minPlayers: true };
  };

  form: FormGroup | undefined;

  preloadLoadPlayers(preset: string[]): void {
    this.form = this.formBuilder.group({
      players: this.formBuilder.array(
        preset.map((name) => {
          return this.formBuilder.group({ name: name } as PlayerFormData);
        }),
        [this.minimumTwoPlayersValidator]
      ),
    });
  }

  ngOnInit(): void {
    this.preloadLoadPlayers(this.defaultNames);
    this.form?.valueChanges.subscribe(() => {
      this.isFormValid.emit(this.form?.valid);
    });

    this.isFormValid.emit(this.form?.valid);
  }

  ngOnDestory(): void {
    // todo: create unsub subject
    this.isFormValid.unsubscribe();
  }
  get playerInputs(): FormArray {
    return this.form?.get('players') as FormArray;
  }

  addPlayer(): void {
    this.playerInputs.push(this.formBuilder.group({ name: '' }));
  }

  removePlayer(): void {
    if (this.playerInputs.length > this.minPlayerNumber) {
      this.playerInputs.removeAt(this.playerInputs.length - 1);
    }
  }

  setPlayers(): void {
    this.playerInputs.controls.forEach((control) => {
      const name = control.value.name;
      if (name.trim().length) {
        this.players.push(new Player(control.value.name));
      }
    });
  }
}

interface PlayerFormData {
  name: string;
}
