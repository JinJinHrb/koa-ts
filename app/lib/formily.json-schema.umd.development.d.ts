import { IGeneralFieldState, GeneralField, FormPathPattern, IFieldFactoryProps } from '@formily/core';

type SchemaEnum<Message> = Array<string | number | boolean | {
    label?: Message;
    value?: any;
    [key: string]: any;
} | {
    key?: any;
    title?: Message;
    [key: string]: any;
}>;
type SchemaTypes = 'string' | 'object' | 'array' | 'number' | 'boolean' | 'void' | 'date' | 'datetime' | (string & {});
type SchemaProperties<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message> = Record<string, ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>>;
type SchemaPatch = (schema: ISchema) => ISchema;
type SchemaKey = string | number;
type SchemaEffectTypes = 'onFieldInit' | 'onFieldMount' | 'onFieldUnmount' | 'onFieldValueChange' | 'onFieldInputValueChange' | 'onFieldInitialValueChange' | 'onFieldValidateStart' | 'onFieldValidateEnd' | 'onFieldValidateFailed' | 'onFieldValidateSuccess';
type SchemaReaction<Field = any> = {
    dependencies?: Array<string | {
        name?: string;
        type?: string;
        source?: string;
        property?: string;
    }> | Record<string, string>;
    when?: string | boolean;
    target?: string;
    effects?: (SchemaEffectTypes | (string & {}))[];
    fulfill?: {
        state?: Stringify<IGeneralFieldState>;
        schema?: ISchema;
        run?: string;
    };
    otherwise?: {
        state?: Stringify<IGeneralFieldState>;
        schema?: ISchema;
        run?: string;
    };
    [key: string]: any;
} | ((field: Field, scope: any) => void);
type SchemaReactions<Field = any> = SchemaReaction<Field> | SchemaReaction<Field>[];
type SchemaItems<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message> = ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message> | ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>[];
type SchemaComponents = Record<string, any>;
interface ISchemaFieldUpdateRequest {
    state?: Stringify<IGeneralFieldState>;
    schema?: ISchema;
    run?: string;
}
interface IFieldStateSetterOptions {
    field: GeneralField;
    target?: FormPathPattern;
    request: ISchemaFieldUpdateRequest;
    runner?: string;
    scope?: any;
}
interface ISchemaTransformerOptions {
    scope?: any;
}
type Stringify<P extends {
    [key: string]: any;
}> = {
    [key in keyof P]?: P[key] | string;
};
type ISchema<Decorator = any, Component = any, DecoratorProps = any, ComponentProps = any, Pattern = any, Display = any, Validator = any, Message = any, ReactionField = any> = Stringify<{
    version?: string;
    name?: SchemaKey;
    title?: Message;
    description?: Message;
    default?: any;
    readOnly?: boolean;
    writeOnly?: boolean;
    type?: SchemaTypes;
    enum?: SchemaEnum<Message>;
    const?: any;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;
    maxLength?: number;
    minLength?: number;
    pattern?: string | RegExp;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[] | boolean | string;
    format?: string;
    $ref?: string;
    $namespace?: string;
    /** nested json schema spec **/
    definitions?: SchemaProperties<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>;
    properties?: SchemaProperties<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>;
    items?: SchemaItems<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>;
    additionalItems?: ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>;
    patternProperties?: SchemaProperties<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>;
    additionalProperties?: ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>;
    ['x-value']?: any;
    ['x-index']?: number;
    ['x-pattern']?: Pattern;
    ['x-display']?: Display;
    ['x-validator']?: Validator;
    ['x-decorator']?: Decorator | (string & {}) | ((...args: any[]) => any);
    ['x-decorator-props']?: DecoratorProps;
    ['x-component']?: Component | (string & {}) | ((...args: any[]) => any);
    ['x-component-props']?: ComponentProps;
    ['x-reactions']?: SchemaReactions<ReactionField>;
    ['x-content']?: any;
    ['x-data']?: any;
    ['x-visible']?: boolean;
    ['x-hidden']?: boolean;
    ['x-disabled']?: boolean;
    ['x-editable']?: boolean;
    ['x-read-only']?: boolean;
    ['x-read-pretty']?: boolean;
    ['x-compile-omitted']?: string[];
    [key: `x-${string | number}` | symbol]: any;
}>;

declare class Schema<Decorator = any, Component = any, DecoratorProps = any, ComponentProps = any, Pattern = any, Display = any, Validator = any, Message = any, ReactionField = any> implements ISchema {
    parent?: Schema;
    root?: Schema;
    name?: SchemaKey;
    title?: Message;
    description?: Message;
    default?: any;
    readOnly?: boolean;
    writeOnly?: boolean;
    type?: SchemaTypes;
    enum?: SchemaEnum<Message>;
    const?: any;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;
    maxLength?: number;
    minLength?: number;
    pattern?: string | RegExp;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[] | boolean | string;
    format?: string;
    /** nested json schema spec **/
    definitions?: Record<string, Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>>;
    properties?: Record<string, Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>>;
    items?: Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message> | Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>[];
    additionalItems?: Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>;
    patternProperties?: Record<string, Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>>;
    additionalProperties?: Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>;
    ['x-index']?: number;
    ['x-pattern']?: Pattern;
    ['x-display']?: Display;
    ['x-validator']?: Validator;
    ['x-decorator']?: Decorator;
    ['x-decorator-props']?: DecoratorProps;
    ['x-component']?: Component;
    ['x-component-props']?: ComponentProps;
    ['x-reactions']?: SchemaReaction<ReactionField>[];
    ['x-content']?: any;
    ['x-data']?: any;
    ['x-visible']?: boolean;
    ['x-hidden']?: boolean;
    ['x-disabled']?: boolean;
    ['x-editable']?: boolean;
    ['x-read-only']?: boolean;
    ['x-read-pretty']?: boolean;
    ['x-compile-omitted']?: string[];
    [key: `x-${string | number}` | symbol]: any;
    _isJSONSchemaObject: boolean;
    version: string;
    constructor(json: ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>, parent?: Schema);
    addProperty: (key: SchemaKey, schema: ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>) => Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message, any>;
    removeProperty: (key: SchemaKey) => Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message, any>;
    setProperties: (properties: SchemaProperties<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>) => this;
    addPatternProperty: (key: SchemaKey, schema: ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>) => Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message, any>;
    removePatternProperty: (key: SchemaKey) => Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message, any>;
    setPatternProperties: (properties: SchemaProperties<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>) => this;
    setAdditionalProperties: (properties: ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>) => Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message, any>;
    setItems: (schema: ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message> | ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>[]) => Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message, any> | Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message, any>[];
    setAdditionalItems: (items: ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>) => Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message, any>;
    findDefinitions: (ref: string) => any;
    mapProperties: <T>(callback?: (schema: Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>, key: SchemaKey, index: number) => T) => T[];
    mapPatternProperties: <T>(callback?: (schema: Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>, key: SchemaKey, index: number) => T) => T[];
    reduceProperties: <P, R>(callback?: (buffer: P, schema: Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>, key: SchemaKey, index: number) => R, predicate?: P) => R;
    reducePatternProperties: <P, R>(callback?: (buffer: P, schema: Schema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>, key: SchemaKey, index: number) => R, predicate?: P) => R;
    compile: (scope?: any) => Schema<any, any, any, any, any, any, any, any, any>;
    fromJSON: (json: ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>) => Schema<any, any, any, any, any, any, any, any, any>;
    toJSON: (recursion?: boolean) => ISchema<Decorator, Component, DecoratorProps, ComponentProps, Pattern, Display, Validator, Message>;
    toFieldProps: (options?: ISchemaTransformerOptions) => IFieldFactoryProps<any, any>;
    static getOrderProperties: (schema?: ISchema, propertiesName?: keyof ISchema) => any[];
    static compile: (expression: any, scope?: any) => any;
    static shallowCompile: (expression: any, scope?: any) => any;
    static isSchemaInstance: (value: any) => value is Schema<any, any, any, any, any, any, any, any, any>;
    static registerCompiler: (compiler: (expression: string, scope: any) => any) => void;
    static registerPatches: (...args: SchemaPatch[]) => void;
    static registerVoidComponents: (components: string[]) => void;
    static registerTypeDefaultComponents: (maps: Record<string, string>) => void;
    static registerPolyfills: (version: string, patch: SchemaPatch) => void;
    static enablePolyfills: (versions?: string[]) => void;
    static silent: (value?: boolean) => void;
}

declare const validateOnServer: (schema: ISchema, values: unknown) => any;

export { IFieldStateSetterOptions, ISchema, ISchemaFieldUpdateRequest, ISchemaTransformerOptions, Schema, SchemaComponents, SchemaEffectTypes, SchemaEnum, SchemaItems, SchemaKey, SchemaPatch, SchemaProperties, SchemaReaction, SchemaReactions, SchemaTypes, Stringify, validateOnServer };
