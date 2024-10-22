import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div>
      <form [formGroup]="form">
        <button type="button" (click)="addPlayer()">Add</button>
        <ng-container
          formArrayName="players"
          *ngFor="let player of players.controls; index as i"
          ><p>
            Player {{ i + 1 }}
            <ng-container [formGroupName]="i">
              <input formControlName="name" />
            </ng-container>
          </p>
        </ng-container>
      </form>
      <button (click)="startGame()" [disabled]="!form.valid">Start Game</button>
    </div>
  `,
})
export class PlayerInputComponent {
  @Output() startGameClicked = new EventEmitter<string[]>();

  constructor(private formBuilder: FormBuilder) {}

  baseData = [
    { name: 'Sabine' } as PlayerFormData,
    { name: 'Ernst' } as PlayerFormData,
    { name: 'Franzi' } as PlayerFormData,
  ];

  form: FormGroup = this.formBuilder.group({
    players: this.formBuilder.array(
      this.baseData.map((player) => this.formBuilder.group(player)),
      [this.minimumTwoPlayersValidator]
    ),
  });

  get players(): FormArray {
    return this.form.get('players') as FormArray;
  }

  addPlayer(): void {
    this.players.push(this.formBuilder.group({ name: '' }));
  }

  startGame(): void {
    if (this.form.valid) {
      const playerNames = this.players.controls.map(
        (control) => control.value.name
      );
      this.startGameClicked.emit(playerNames);
    }
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
