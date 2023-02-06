import { OverlayRef } from "@angular/cdk/overlay";
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { PomodoroService } from "../../shared/services/pomodoro.service";
import { SoundService } from "../../shared/services/sound.service";
import { SettingForm } from "./interfaces/setting-form.interface";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  form!: FormGroup<SettingForm>

  constructor(
    private fb: FormBuilder,
    private pomodoro: PomodoroService,
    private sound: SoundService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      minutes: [this.pomodoro.minutes],
      sound: [this.sound.attentionFile]
    }) as FormGroup<SettingForm>;
  }

  onSubmit(): void {
    const { sound, minutes } = this.form.value;
    this.pomodoro.minutes = minutes!;
    this.sound.attentionFile = sound!;
    this.close.emit();
  }
}
