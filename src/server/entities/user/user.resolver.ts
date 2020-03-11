import { InjectRepository } from 'typeorm-typedi-extensions';
import { Resolver, Query, Mutation, InputType, Field, Arg } from "type-graphql";
import { UserEntity } from "./user.entity";
import { Repository } from 'typeorm';

@InputType()
class CreateUserInput {
  @Field() email!: string;
  @Field() name!: string;
  @Field() password!: string;
}
// @InputType({ description: "New recipe data" })
// class AddRecipeInput implements Partial<Recipe> {
//   @Field()
//   title: string;

//   @Field({ nullable: true })
//   description?: string;
// }

// @Resolver()
// class RecipeResolver {
//   // ...
//   @Mutation()
//   addRecipe(@Arg("data") newRecipeData: AddRecipeInput, @Ctx() ctx: Context): Recipe {
//     // sample implementation
//     const recipe = RecipesUtils.create(newRecipeData, ctx.user);
//     this.recipesCollection.push(recipe);
//     return recipe;
//   }
// }


@Resolver(UserEntity)
export class UserResolver {
  /**
   * @constructor
   * 
   * @param _userRepository 
   */
  constructor(
    @InjectRepository(UserEntity) public readonly _userRepository: Repository<UserEntity>,
  ) {}

  /**
   * @description
   * Create a user
   * 
   * @param data 
   */
  @Mutation(() => UserEntity)
  async createUser(
    @Arg('data') data: CreateUserInput,
  ): Promise<UserEntity> {
    // TODO: use object mashing
    const user = new UserEntity();
    user.email = data.email;
    user.name = data.name;
    // TODO: encrypt password
    user.password = data.password;

    const result = await this._userRepository.save(user);

    return result;
  }


  /**
   * @description
   * Query a list of users
   */
  @Query(() => [UserEntity])
  async UserIndex(
    // TODO: args
  ): Promise<UserEntity[]> {
    // TODO
    const results = await this._userRepository.find({ take: 10 });
    return results;
  }
}