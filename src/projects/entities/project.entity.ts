import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ManyToOne(() => User, (user) => user.projects)
    @JoinTable()
    user: User

    @Column()
    tool: string

    @Column()
    set: string

    @Column({type: 'timestamp', nullable: true})
    dueDate: Date
}
