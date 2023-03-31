import * as pulumi from "@pulumi/pulumi";

pulumi.runtime.setMocks({
    newResource: function (args: pulumi.runtime.MockResourceArgs): { id: string, state: any } {
        switch(args.type) {
            case "aws-apigateway:index:RestAPI":
                return {
                    id: "1234",
                    state: {
                        stage: {
                            stageName: args.inputs.stageName
                        }
                    }
                }
            case "aws:apigateway:RestApi":
                return {
                    id: "12345",
                    state: args.inputs
                }
        }
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function (args: pulumi.runtime.MockCallArgs) {
        
        return args.inputs;
    },
},
    "project",
    "stack",
    false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("Infrastructure", function () {
    let infra: typeof import("./index");

    before(async function () {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    describe("apigateway", function() {
        it("must have a stage called test", function(done) {
            infra.api.stage.stageName.apply(s => {
                if(s !== "test") {
                    done(new Error(`Stage name must be set to test. It's currently set to: ${s}`))
                } else {
                    done()
                }
            });
        })
    })
});