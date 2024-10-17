import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/sync")
export class HelloWorldController {
	@Get("/")
	get() {
		return "Hello World";
	}
}
