export interface CreateTranslatableOptions {
  ctx: any;
  entityType: ClassDecorator;
  translationType: ClassDecorator;
  beforeSave?: (newEntity: ClassDecorator) => any | Promise<any>;
  typeOrmSubscriberData?: any;
}
