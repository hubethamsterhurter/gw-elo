import { Field, InputType, ObjectType, ID } from 'type-graphql';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToOne } from 'typeorm'
import { USER_TABLE } from './user.table';
import { USER_FIELD } from './user.field';
import { DB_CONST } from '../../../constants/db.constant';
import { USER_RELATION } from './user.relation';
import { MaybeLazy } from '../../../types/maybe-lazy';
import { PlayerEntity } from '../player/player.entity';

@ObjectType()
@Entity({ name: USER_TABLE, })
export class UserEntity {
  @Field(() => PlayerEntity)
  @OneToOne(() => PlayerEntity, { lazy: true, nullable: true })
  [USER_RELATION.PLAYER]!: MaybeLazy<PlayerEntity | null>;

  // good enough

  @Field(() => ID) @PrimaryGeneratedColumn('uuid') [USER_FIELD.ID]!: string;
  @Field(() => String) @Column({ type: 'varchar', length: DB_CONST.STR_LONG }) [USER_FIELD.EMAIL]!: string;
  @Field(() => String) @Column({ type: 'varchar', length: DB_CONST.STR_LONG }) [USER_FIELD.NAME]!: string;
  @Field(() => String) @Column({ type: 'varchar', length: DB_CONST.STR_LONG }) [USER_FIELD.PASSWORD]!: string;
  @Field(() => Date) @UpdateDateColumn() [USER_FIELD.UPDATED_AT]!: Date;
  @Field(() => Date) @CreateDateColumn() [USER_FIELD.CREATED_AT]!: Date;
}