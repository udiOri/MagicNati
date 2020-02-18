import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { expirementModel } from "src/models/ExpirementModel";
import { Power1, TimelineMax } from "gsap";

@Component({
  selector: "app-cauldron",
  templateUrl: "./cauldron.component.html",
  styleUrls: ["./cauldron.component.css"]
})
export class CauldronComponent implements OnInit {
  myData: any = [];
  expirementArray: expirementModel[] = [];
  arrayFull = false;

  exp1: string = "";
  exp2: string = "";
  exp3: string = "";

  mixes: boolean = false; // fruit , honey , red herring // side to side
  slices: boolean = false; // milk , salt , peppermint // up and down
  grinds: boolean = false; // magic ink , crocodile tears // down+grow back+ shrink
  stirs: boolean = false; // dragon sweat , soot // side to side

  @ViewChild("fruit", { static: false }) fruit: ElementRef;
  @ViewChild("honey", { static: false }) honey: ElementRef;
  @ViewChild("herring", { static: false }) herring: ElementRef;
  @ViewChild("milk", { static: false }) milk: ElementRef;
  @ViewChild("salt", { static: false }) salt: ElementRef;
  @ViewChild("peppermint", { static: false }) peppermint: ElementRef;
  @ViewChild("magic", { static: false }) magic: ElementRef;
  @ViewChild("crocodile", { static: false }) crocodile: ElementRef;
  @ViewChild("dragon", { static: false }) dragon: ElementRef;
  @ViewChild("soot", { static: false }) soot: ElementRef;

  Steps = new FormGroup({
    expName: new FormControl(""),
    step1: new FormControl(""),
    step2: new FormControl(""),
    step3: new FormControl("")
  });

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this._http.get("../../assets/magic_book.json").subscribe(res => {
      console.log(res);
      this.myData = res.processes;
    });
  }

  addExp(form: FormGroup) {
    if (this.expirementArray.length < 3) {
      let expName = form.get("expName").value;
      let step1 = form.get("step1").value;
      let step2 = form.get("step2").value;
      let step3 = form.get("step3").value;

      const expNew = {} as expirementModel;
      expNew.expName = expName;
      expNew.process1 = step1;
      expNew.process2 = step2;
      expNew.process3 = step3;

      this.expirementArray.push(expNew);

      console.log(this.expirementArray);
    }
    if (this.expirementArray.length > 2) {
      this.arrayFull = true; //fix this. shpuld stop before the 4 click
    }
    form.reset();
    this.showExp();
  }

  showExp() {
    for (let i = 0; i < this.expirementArray.length; ++i) {
      if (this.exp1 === "") {
        this.exp1 = this.expirementArray[0].expName;
      } else if (this.exp1 != "" && this.exp2 === "") {
        this.exp2 = this.expirementArray[1].expName;
      } else if (this.exp1 != "" && this.exp2 != "" && this.exp3 === "") {
        this.exp3 = this.expirementArray[2].expName;
      } else {
        return;
      }
    }
  }
  ///////////////////////////////// process animations
  animationMixes() {
    this.mixes = true;
    setTimeout(() => {
      this.animationFruit();
    }, 1000);
    setTimeout(() => {
      this.animationHoney();
    }, 2000);
    setTimeout(() => {
      this.animationHerring();
    }, 3000);
  }

  animationSlices() {
    this.slices = true;
    setTimeout(() => {
      this.animationMilk();
    }, 1000);
    setTimeout(() => {
      this.animationSalt();
    }, 2000);
    setTimeout(() => {
      this.animationPepper();
    }, 3000);
  }

  animationGrinds() {
    this.grinds = true;
    setTimeout(() => {
      this.animationMagic();
    }, 1000);
    setTimeout(() => {
      this.animationCrock();
    }, 2000);
  }

  animationStirs() {
    this.stirs = true;
    setTimeout(() => {
      this.animationSoot();
    }, 1000);
    setTimeout(() => {
      this.animationDragon();
    }, 2000);
  }

  ///////////////////////////////////////////////////////// ingr animations

  animationFruit() {
    let tl = new TimelineMax();
    tl.to(this.fruit.nativeElement, 0.25, { y: 300, ease: Power1.easeInOut })
      .to(this.fruit.nativeElement, 0.25, { x: 150 })
      .to(this.fruit.nativeElement, 0.25, { x: -150 })
      .to(this.fruit.nativeElement, 0.25, {
        x: 60,
        opacity: 0,
        ease: Power1.easeInOut
      });
  }

  animationHoney() {
    let tl = new TimelineMax();
    tl.to(this.honey.nativeElement, 0.25, { y: 300, ease: Power1.easeInOut })
      .to(this.honey.nativeElement, 0.25, { x: 150 })
      .to(this.honey.nativeElement, 0.25, { x: -150 })
      .to(this.honey.nativeElement, 0.25, {
        x: 60,
        opacity: 0,
        ease: Power1.easeInOut
      });
  }

  animationHerring() {
    let tl = new TimelineMax();
    tl.to(this.herring.nativeElement, 0.25, { y: 300, ease: Power1.easeInOut })
      .to(this.herring.nativeElement, 0.25, { x: 150 })
      .to(this.herring.nativeElement, 0.25, { x: -150 })
      .to(this.herring.nativeElement, 0.25, {
        x: 60,
        opacity: 0,
        ease: Power1.easeInOut
      });
  }

  animationMilk() {
    let tl = new TimelineMax();
    tl.to(this.milk.nativeElement, 0.3, {
      y: 300,
      ease: Power1.easeInOut
    })
      .to(this.milk.nativeElement, 0.3, { y: -100 })
      .to(this.milk.nativeElement, 0.3, {
        y: 300,
        opacity: 0,
        ease: Power1.easeInOut
      });
  }
  animationSalt() {
    let tl = new TimelineMax();
    tl.to(this.salt.nativeElement, 0.3, {
      y: 300,
      ease: Power1.easeInOut
    })
      .to(this.salt.nativeElement, 0.3, { y: -100 })
      .to(this.salt.nativeElement, 0.3, {
        y: 300,
        opacity: 0,
        ease: Power1.easeInOut
      });
  }
  animationPepper() {
    let tl = new TimelineMax();
    tl.to(this.peppermint.nativeElement, 0.3, {
      y: 300,
      ease: Power1.easeInOut
    })
      .to(this.peppermint.nativeElement, 0.3, { y: -100 })
      .to(this.peppermint.nativeElement, 0.3, {
        y: 300,
        opacity: 0,
        ease: Power1.easeInOut
      });
  }

  animationMagic() {
    let tl = new TimelineMax();
    tl.to(this.magic.nativeElement, 0.3, {
      y: 300,
      ease: Power1.easeInOut
    })
      .to(this.magic.nativeElement, 0.3, { y: -100 })
      .to(this.magic.nativeElement, 0.3, {
        y: 300,
        opacity: 0,
        ease: Power1.easeInOut
      });
  }
  animationCrock() {
    let tl = new TimelineMax();
    tl.to(this.crocodile.nativeElement, 0.3, {
      y: 300,
      ease: Power1.easeInOut
    })
      .to(this.crocodile.nativeElement, 0.3, { y: -100 })
      .to(this.crocodile.nativeElement, 0.3, {
        y: 300,
        opacity: 0,
        ease: Power1.easeInOut
      });
  }

  animationSoot() {
    let tl = new TimelineMax();
    tl.to(this.soot.nativeElement, 0.25, { y: 300, ease: Power1.easeInOut })
      .to(this.soot.nativeElement, 0.25, { x: 150 })
      .to(this.soot.nativeElement, 0.25, { x: -150 })
      .to(this.soot.nativeElement, 0.25, {
        x: 60,
        opacity: 0,
        ease: Power1.easeInOut
      });
  }

  animationDragon() {
    let tl = new TimelineMax();
    tl.to(this.dragon.nativeElement, 0.25, { y: 300, ease: Power1.easeInOut })
      .to(this.dragon.nativeElement, 0.25, { x: 150 })
      .to(this.dragon.nativeElement, 0.25, { x: -150 })
      .to(this.dragon.nativeElement, 0.25, {
        x: 60,
        opacity: 0,
        ease: Power1.easeInOut
      });
  }
}
