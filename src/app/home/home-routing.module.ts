import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: HomePage,
        children: [
            {
                path: 'timeline',
                children: [
                    {
                        path: '',
                        loadChildren: './timeline/timeline.module#TimelinePageModule'
                    },
                    {
                        path: 'add-timeline',
                        loadChildren: './timeline/add-timeline/add-timeline.module#AddTimelinePageModule'
                    }
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: './profile/profile.module#ProfilePageModule'
                    },
                    
                    {
                        path: 'edit-profile',
                        loadChildren: './profile/edit-profile/edit-profile.module#EditProfilePageModule'
                    }
                ]
            },
            {
                path: 'meeting',
                children: [
                    {
                        path: '',
                        loadChildren: './meeting/meeting.module#MeetingPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/home/tabs/timeline',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home/tabs/timeline',
        pathMatch: 'full'
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
