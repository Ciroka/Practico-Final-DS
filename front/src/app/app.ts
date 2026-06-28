import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastComponent } from './shared/toast/toast';
import { BottomNav } from './shared/bottom-nav/bottom-nav';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BottomNav, Footer, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
