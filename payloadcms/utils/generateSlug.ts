import slugify from 'slugify';
import { Condition, FieldHook } from 'payload';
import { DEFAULT_LOCALE } from '../../payload.config';

export const generateSlugFromTitleByDefaultLocale: FieldHook = async ({ data, req }) => {
    const locale = req.locale;
    const defaultLocale = req.payload.config.i18n.fallbackLanguage ?? "en";
    const title = data?.title;

    if (data?.slug) return data.slug;

    if (locale === defaultLocale && typeof title === 'string') {
        return slugify(title, {lower: true, strict: true});
    }

    return undefined
}

export const setDefaultTitle: FieldHook = async ({ data, req }) => {
    const locale = req.locale;
    const defaultLocale = req.payload.config.i18n.fallbackLanguage ?? "en";
    if (locale === defaultLocale && typeof data?.title === 'string') {
        return data?.title;
    }
    return undefined
}

export const isDefaultLocale: Condition = ({siblingData }) => {
    // console.log("locale", siblingData )
    return true //locale === DEFAULT_LOCALE;
}