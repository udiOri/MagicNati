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
  mixes: boolean = false; // fruit , honey , red herring
  slices: boolean = false; // milk , salt , peppermint
  grinds: boolean = false; // magic ink , crocodile tears
  stirs: boolean = false; // dragon sweat , soot
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
}
