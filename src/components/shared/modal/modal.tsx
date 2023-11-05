import { type PropFunction, Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface Props {
    showModal  : boolean;
    persistent?: boolean;
    size?      : 'sm'|'md'|'lg';
    closeFn    : PropFunction<() => void>;
}

export const Modal = component$( ( { 
    showModal, 
    closeFn,
    size = 'md',
    persistent = false
}: Props) => {
    useStylesScoped$(ModalStyles);

    const modalSize = {
        sm: 'modal-sm',
        md: 'modal-md',
        lg: 'modal-lg',
    }

    return (
        // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
        <div id="modal-content" 
        onClick$={ ( event ) => {
            const elementId = (event.target as HTMLDivElement).id
            if(elementId === 'modal-content' && !persistent) closeFn();
        }}
        class={ showModal ? "modal-background" : 'hidden'}>

            <div class={`modal-content ${modalSize[size]}`}>
                
                <div class="mt-3 text-center">
                    
                    <h3 class="modal-title">
                        {/* Al colocar <Slot /> significa que el componente esta habilitado para recibir etiquetas hijas, es decir, se convierte en un HOC (Hide Order Component) 
                            
                            Al agregarle la propiedad "name" le estamos indicando que tendrá un hijo que podrá ser enviado como componente hijo en la declaración del componente padre.
                        */}
                        <Slot name='title' />
                    </h3>

                    <div class="mt-2 px-7 py-3">
                        <div class="modal-content-text">

                            <Slot name="content" /> 
                        </div>
                    </div>

                    <Slot />

                    {/* Botton */}
                    <div class="items-center px-4 py-3">
                        <button
                            onClick$={closeFn}
                            id="ok-btn"
                            class="modal-button"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
});