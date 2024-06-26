import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { UserServiceService } from "../services/user-service.service";

interface User {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  users: User[] = []; 
  displayedColumns: string[] = ['name', 'role', 'actions'];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {

    console.log('loading');

    this.userService.getusers().subscribe((data: any) => {

      console.log(data);

      this.users = data.map(user => ({
        id: user.userId,
        name: user.userName,
        email: user.email,
        role: user.roles[0]
      }));

    });

  }

  onAdd(): void {
    this.router.navigate(['/create-user']); 
  }

  onEdit(user: User): void {
    // Implementation for editing a user
  }

  onDelete(index: number): void {
    this.users.splice(index, 1); // Deletes the user locally from the array
  }
}
