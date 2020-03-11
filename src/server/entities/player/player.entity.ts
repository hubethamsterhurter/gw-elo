import { Field, InputType, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, JoinColumn, OneToOne } from 'typeorm'
import { PLAYER_TABLE } from './player.table';
import { PLAYER_FIELD } from './player.field';
import { DB_CONST } from '../../../constants/db.constant';
import { USER_FIELD } from '../user/user.field';
import { UserEntity } from '../user/user.entity';
import { PLAYER_RELATION } from './player.relation';
import { MaybeLazy } from '../../../types/maybe-lazy';

@ObjectType()
@Entity({ name: PLAYER_TABLE, })
export class PlayerEntity {
  @Field(() => UserEntity)
  @OneToOne(() => UserEntity, { lazy: true, nullable: true })
  @JoinColumn({ name: PLAYER_FIELD.USER_ID })
  [PLAYER_RELATION.USER]!: MaybeLazy<UserEntity | null>;

  // que?
  @Field(() => String) @PrimaryGeneratedColumn('uuid') [PLAYER_FIELD.ID]!: string;
  @Field(() => String) @Column({ type: 'uuid' }) [PLAYER_FIELD.USER_ID]!: string;
  @Field(() => String) @Column({ type: 'varchar', length: DB_CONST.STR_LONG }) [PLAYER_FIELD.NAME]!: string;
  @Field(() => Date) @UpdateDateColumn() [PLAYER_FIELD.UPDATED_AT]!: Date;
  @Field(() => Date) @CreateDateColumn() [PLAYER_FIELD.CREATED_AT]!: Date;
}
