import { Field } from 'type-graphql';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'
import { PLAYER_TABLE } from './player.table';
import { PLAYER_FIELD } from './player.field';
import { DB_CONST } from '../../constants/db.constant';

@Entity({ name: PLAYER_TABLE, })
export class PlayerEntity {
  @Field(() => String) @PrimaryGeneratedColumn({ type: 'uuid' }) [PLAYER_FIELD.ID]!: string;
  @Field(() => String) @Column({ type: 'varchar', length: DB_CONST.STR_LONG }) [PLAYER_FIELD.NAME]!: string;
  @Field(() => Date) @UpdateDateColumn() [PLAYER_FIELD.UPDATED_AT]!: Date;
  @Field(() => Date) @CreateDateColumn() [PLAYER_FIELD.CREATED_AT]!: Date;
}
