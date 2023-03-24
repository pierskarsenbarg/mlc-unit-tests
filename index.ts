import * as apigateway from "@pulumi/aws-apigateway";

export const api = new apigateway.RestAPI("api", {
    routes: [{
        path: "/",
        localPath: "www"
    }],
    stageName: "test"
});