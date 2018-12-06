import {Tag} from './Tag';

export interface User {
    id?: string;
    likedArticles?: string[];
    added_tag?: Tag[];
    onboarded?: boolean;
    centralized?: boolean;
    key_addresses?: string[];
    recovery_addresses?: string[];
    identity_address?: string;
}