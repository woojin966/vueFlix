<template>
    <article class="footer_wrap">
        <section class="footer_top">
            <ul class="sns_box">
                <li>
                    <a href="javascript:void(0)" class="sns_btn">
                        <font-awesome-icon :icon="['fab', 'facebook-f']" />
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" class="sns_btn">
                        <font-awesome-icon :icon="['fab', 'instagram']" />
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" class="sns_btn">
                        <font-awesome-icon :icon="['fab', 'x-twitter']" />
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" class="sns_btn">
                        <font-awesome-icon :icon="['fab', 'youtube']" />
                    </a>
                </li>
            </ul>
            <ul class="footer_menu_box">
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.audio_desc') }}</a>
                </li>
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.help_center') }}</a>
                </li>
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.gift_card') }}</a>
                </li>
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.media_center') }}</a>
                </li>
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.investor_relations') }}</a>
                </li>
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.jobs') }}</a>
                </li>
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.terms') }}</a>
                </li>
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.privacy') }}</a>
                </li>
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.legal_notices') }}</a>
                </li>
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.cookie_pref') }}</a>
                </li>
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.corporate_info') }}</a>  
                </li>
                <li>
                    <a class="f_menu_btn small n">{{ t('footer.contact_us') }}</a>
                </li>
            </ul>
        </section>
        <section class="footer_bottom">
            <div class="servcicecod_btn_box">
                <button type="button" class="servicecode_btn small n">{{ t('footer_bottom.service_code') }}</button>
            </div>
            <div class="infomation_box">
                <p class="mini n">
                    <span>{{ t('footer_bottom.company_name') }}</span>
                    <span>{{ t('footer_bottom.business_number') }}</span>
                    <span>{{ t('footer_bottom.phone') }}</span>
                </p>
                <p class="mini n">
                    <span>{{ t('footer_bottom.ceo') }}</span>
                </p>
                <p class="mini n">
                    <span v-html="t('footer_bottom.email')"></span>
                </p>
                <p class="mini n">
                    <span v-html="t('footer_bottom.address')"></span>
                </p>
                <p class="mini n">
                    <span>{{ t('footer_bottom.register_number') }}</span>
                </p>
                <p class="mini n">
                    <span>{{ t('footer_bottom.hosting') }}</span>
                </p>
                <p class="mini n">
                    <span>{{ t('footer_bottom.ftc') }}</span>
                </p>
            </div>
        </section>
    </article>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'

    const { t, locale } = useI18n({ useScope: 'global' })
</script>

<style scoped lang="scss">
@import '../assets/footer.scss';
</style>