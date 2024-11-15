import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CreateDiplomaComponent } from './create-diploma/create-diploma.component';
import { FileSignComponent } from './file-sign/file-sign.component';
import { InvertImageComponent } from './invert-image/invert-image.component';
import { RsaKeysComponent } from './rsa-keys/rsa-keys.component';
import { VerifSignComponent } from './verif-sign/verif-sign.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'diploma', pathMatch: 'full' },
            { path: 'diploma', component: CreateDiplomaComponent },
            { path: 'file-sign', component: FileSignComponent },
            { path: 'invert-image', component: InvertImageComponent },
            { path: 'rsa-keys', component: RsaKeysComponent },
            { path: 'verif-sign', component: VerifSignComponent },
            { path: '**', redirectTo: 'errors/404' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
