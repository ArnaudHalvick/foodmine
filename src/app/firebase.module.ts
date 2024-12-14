import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat'; // Import AngularFireModule
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Import AngularFireAuthModule

const firebaseConfig = {
  apiKey: 'AIzaSyDwB42x-WSfESqA3RUYRbL1DTPC0waDC2M',
  authDomain: 'foodmine-arnaud.firebaseapp.com',
  projectId: 'foodmine-arnaud',
  storageBucket: 'foodmine-arnaud.firebasestorage.app',
  messagingSenderId: '286967092316',
  appId: '1:286967092316:web:45eb00b296bfd93aaa4299',
};

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  exports: [AngularFireModule, AngularFireAuthModule],
})
export class FirebaseModule {}
