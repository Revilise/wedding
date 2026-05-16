import { Section } from '@ui/section';
import { SuggestForm } from '@widgets/suggestForm';

export const SuggestionsSection = () => {
    return (
        <Section
            extraCN={{ isSuggestions: true }}
            heading={
                <>
                    <h2 className="h2 align-right">Предложения</h2>
                    <p className="align-right">
                        Если у вас есть предложения к программе, например, хотите спеть или станцевать, вы можете
                        оставить заявку.
                    </p>
                </>
            }
        >
            <SuggestForm />
        </Section>
    );
};
