const {
    describe,
    test,
    expect,
} = require('@jest/globals')

const aws = require('aws-sdk')
aws.config.update({
    region: 'us-east-1'
})



const requestMock = require('./mocks/reques.json')
const {
    main
} = require('../../src')

describe('Image Analiser test suit', () => {
    test('it should analyse successfuly the image returning the results', async () => {
        const finalText = ["100.00% de ser do tipo Animal", "100.00% de ser do tipo canino", "100.00% de ser do tipo cão", "100.00% de ser do tipo Golden Retriever", "100.00% de ser do tipo mamífero", "100.00% de ser do tipo animal de estimação"].join("\n")
        const expected = {
            statusCode: 200,
            body: `A imagem tem \n`.concat(finalText)
        }
        const result = await main(requestMock)

        expect(result).toStrictEqual(expected)
    })
    test('given empty querystring it should return http 400', async() => {
        const expected = {
            statusCode: 400,
            body: 'an Image Url is required!'
        }

        const result = await main({queryStringParameters: {}})

        expect(result).toStrictEqual(expected)
    })
    test('given invalid imageurl it should return 500', async() => {
        const expected = {
            statusCode: 500,
            body: 'Internal Server Error!'
        }

        const result = await main({queryStringParameters: {imageUrl: "test"}})

        expect(result).toStrictEqual(expected)
    })
})