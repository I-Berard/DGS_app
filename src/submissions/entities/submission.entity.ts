import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Submission {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Project, (project) => project.submission)
    @JoinColumn()
    project: Project
    
    @Column()
    application: string

    @Column()
    link: string

    @Column()
    modality: string

    @Column()
    summary: string

    @Column("text", {array: true})
    pricing_options: string[]

    @Column()
    full_name: string

}
