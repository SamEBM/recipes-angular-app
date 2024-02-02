import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
    open: boolean = true;
    constructor(private element: ElementRef, private renderer: Renderer2){

    }
    
    ngOnInit(){

    }

    @HostListener('click') onClick(eventData: Event){
        if(this.open){
            this.renderer.addClass(this.element.nativeElement,'open');
            this.open = false;
        }else{
            this.renderer.removeClass(this.element.nativeElement,'open');
            this.open = true;
        }
    }
}