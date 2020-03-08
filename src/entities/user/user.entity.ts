import { Field } from 'type-graphql';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'
import { USER_TABLE } from './user.table';
import { USER_FIELD } from './user.field';
import { DB_CONST } from '../../constants/db.constant';

@Entity({ name: USER_TABLE, })
export class UserEntity {
  @Field(() => String) @PrimaryGeneratedColumn({ type: 'uuid' }) [USER_FIELD.ID]!: string;
  @Field(() => String) @Column({ type: 'varchar', length: DB_CONST.STR_LONG }) [USER_FIELD.EMAIL]!: string;
  @Field(() => String) @Column({ type: 'varchar', length: DB_CONST.STR_LONG }) [USER_FIELD.NAME]!: string;
  @Field(() => String) @Column({ type: 'varchar', length: DB_CONST.STR_LONG }) [USER_FIELD.PASSWORD]!: string;
  @Field(() => Date) @UpdateDateColumn() [USER_FIELD.UPDATED_AT]!: Date;
  @Field(() => Date) @CreateDateColumn() [USER_FIELD.CREATED_AT]!: Date;
}