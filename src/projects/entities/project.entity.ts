import { Submission } from "src/submissions/entities/submission.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToOne } from "typeorm";

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ManyToOne(() => User, (user) => user.projects)
    @JoinColumn()
    user: User

    @Column()
    tool: string

    @Column()
    set: string

    @OneToOne(() => Submission, (submission) => submission.project)
    @JoinColumn()
    submission: Submission

    @Column({type: 'timestamp', nullable: true})
    dueDate: Date
}
