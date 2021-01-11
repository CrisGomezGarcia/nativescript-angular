import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../../interfaces/user';
import { UsersService } from './../../services/users/users.service';
import { RouterExtensions } from '@nativescript/angular';
import { ActivityIndicator, Dialogs, EventData, ItemEventData, PanGestureEventData, SwipeGestureEventData } from '@nativescript/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  Users$: Observable<User[]>;
  selectedItem: User;
  isBusy: Boolean = true;

  constructor(
    private usersService: UsersService,
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit(): void {
    this.loadUserList();
  }

  ngOnDestroy(): void { }

  onNavItemTap(NavItemTap: String) {
    this.routerExtensions.navigate([NavItemTap], {
      transition: {
        name: 'fade'
      }
    });
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  onLongPress(id: number) {
    alert(id);
  }

  //#region AbrirDetalles
  onItemTap(evt: ItemEventData): void {
    const index = evt.index;
    this.Users$.subscribe(
      data => {
        this.selectedItem = data[index];
        this.openDetails(this.selectedItem);
      },
      error => {
        console.error(error);
      }
    );
  }

  openDetails(itemUser: User): void {
    const id = itemUser['id'];
    this.routerExtensions.navigate(['/details', id], {
      transition: {
        name: 'fade'
      }
    });
  }
  //#endregion

  onDeleteTap(ItemUser: User): void {
    const id: number = ItemUser.id;
    const confirmOptions = {
      title: 'Eliminar usuario', message: `¿Seguro que desea eliminar a "${ItemUser.name} ${ItemUser.lastname}"?`,
      okButtonText: 'Sí', cancelButtonText: 'No'
    };
    Dialogs.confirm(confirmOptions)
      .then(result => {
        if (result) {
          this.usersService.deleteUser(id).subscribe(
            (response: any) => {
              const options = { title: 'Eliminado', message: '', okButtonText: 'Aceptar' };
              if (response.error) {
                options.message = 'Error al eliminar';
                Dialogs.alert(options);
              } else {
                this.isBusy = true;
                setTimeout(() => {
                  this.isBusy = false;
                }, 1000);
              }
            }
          );
        }
      }).catch(error => {
        console.log(error);
      });
  }

  onEditTap(ItemUser: User) {
    this.routerExtensions.navigate(['/edit', JSON.stringify(ItemUser)], {
      transition: {
        name: 'fade'
      }
    });
  }

  loadUserList() {
    try {
      setTimeout(() => {
        this.Users$ = this.usersService.getUsers();
        this.isBusy = false;
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }

  onBusyChanged(args: EventData) {
    const indicator: ActivityIndicator = <ActivityIndicator>args.object;
    console.log('indicator.busy changed to: ' + indicator.busy);
  }

  onSwipe(args: SwipeGestureEventData) {
    const direction = args.direction;
    if (direction === 8) {
      this.isBusy = true;
      setTimeout(() => {
        this.isBusy = false;
      }, 1500);
    }
  }

}
