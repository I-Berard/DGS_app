import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn , Column, OneToMany } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({unique: true})
    username: string

    @Column({unique: true})
    sandai_email: string

    @Column({unique: true})
    personal_email: string

    @Column()
    password: string

    @Column()
    role: string

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
