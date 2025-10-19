import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly subRepo: Repository<Submission>,

    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>
  ){}

  async create(createSubmissionDto: CreateSubmissionDto) {
    const submission = this.subRepo.create(createSubmissionDto)
    return await this.subRepo.save(submission)
  }

  findAll() {
    return this.subRepo.find();
  }

  async findYourSubmission(name: string){
    const submissions = await this.subRepo.find({ where: {full_name: name}});
    if(!submissions) throw new NotFoundException("Submissions not found");
    return submissions;
  }

  findOne(id: string) {
    return this.subRepo.findOne({where: {id}});
  }

  async update(id: string, updateSubmissionDto: UpdateSubmissionDto) {
    const submission = await this.subRepo.findOne({where: {id}})
    if(!submission) throw new NotFoundException("Submissions not found");

    const updatedSubmission = this.subRepo.merge(submission, updateSubmissionDto);

    return this.subRepo.save(updatedSubmission)
  }

  async remove(id: string) {
    const submission = await this.subRepo.findOne({where: {id}})
    if(!submission) throw new NotFoundException("Submission not found")
    return this.subRepo.remove(submission);
  }
}
