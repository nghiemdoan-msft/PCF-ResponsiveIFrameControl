import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class responsiveIframePCFControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    // Reference to IFrame HTMLElement
	private _iframe: HTMLIFrameElement;

	// SRC for iframe
	private _Source: string;

	// Reference to the control container HTMLDivElement
	private _container: HTMLDivElement;

	// Flag if control view has been rendered
	private _controlViewRendered: boolean;

    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        // Add control initialization code
        this._container = container;
		this._controlViewRendered = false;
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
        if (!this._controlViewRendered) {
			this.renderIFrame();
			this._controlViewRendered = true;
		}

		const iframeSrc = context.parameters.source.raw;

		if(this._Source != iframeSrc) {
			this._Source = iframeSrc ? iframeSrc : "";
			this._iframe.setAttribute("src", this._Source);
		}
    }

    /** 
	 * Render iframe HTML Element and appends it to the control container 
	 */
	 private renderIFrame(): void {
		const iFrameElement: HTMLIFrameElement = document.createElement("iframe");
		iFrameElement.setAttribute("class", "iFrameControl");
		iFrameElement.setAttribute("frameborder", "0");

		this._iframe = iFrameElement;

		this._container.appendChild(this._iframe);
	}

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
