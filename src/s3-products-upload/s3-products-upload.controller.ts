import { S3Event, S3Handler } from 'aws-lambda';

export const productsUpload: S3Handler = async (event: S3Event): Promise<void> => {
  for (const record of event.Records) {
    const { bucket, object } = record.s3;

    console.log(
      JSON.stringify({
        eventName: record.eventName,
        eventTime: record.eventTime,
        bucket: bucket.name,
        key: decodeURIComponent(object.key.replace(/\+/g, ' ')),
        size: object.size,
        etag: object.eTag,
      }),
    );
  }
};
