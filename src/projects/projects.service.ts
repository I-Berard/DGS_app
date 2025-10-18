import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { YourProject } from './dto/YourProject.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>
  ){}

  async create(createProjectDto: CreateProjectDto) {
    const {userId, ...projectData} = createProjectDto;
    const user = await this.userRepo.findOne({where: { id: userId}});
    if(!user) throw new NotFoundException("User not found");

    const project = this.projectRepo.create({
      ...projectData,
      user: user
    })

    return this.projectRepo.save(project);
  }

  findAll() {
    return this.projectRepo.find();
  }

  findOne(id: string) {
    return this.projectRepo.findOne({where: {id}});
  }

  async findYourProjects(set: string, data: YourProject){
    if(set == null){
      const projects = await this.projectRepo.find({where : {set}})
      if(!projects.length) throw new NotFoundException("No project found");
      return projects;
    }

    const projects = await this.projectRepo.find({
      where: {
        set: set,
        user: {id: data.userId}
      },
      relations: ["user"]
    })

    if(!projects.length) throw new NotFoundException("Projects not found");

    return projects;    
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['user']
    })

    if(!project) throw new NotFoundException("Project not found");
    
    if(updateProjectDto.userId){
      const user = await this.userRepo.findOne({where: {id: updateProjectDto.userId}});
      if(!user) throw new NotFoundException("User not found");
      project.user = user
    }

    this.projectRepo.merge(project, updateProjectDto);

    if (updateProjectDto.dueDate) project.dueDate = new Date(updateProjectDto.dueDate);
    
    return this.projectRepo.save(project);
  }

  async remove(id: string) {
    const project = await this.projectRepo.findOne({ where: { id: id }});
    
    if(!project) throw new NotFoundException("Project not found");

    await this.projectRepo.remove(project);

    return {message: "Project successfully removed"};
  }
}
