import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";

@Controller("/sync")
export class HelloWorldController {
  @Get("/")
  get() {
    return "Totally just synced the database for real for real, totally not just a string return..";
  }
}
