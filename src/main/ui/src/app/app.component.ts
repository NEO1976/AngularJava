import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FelgenService } from './felgen/felgen.service';
import { LackierungService } from './lackierung/lackierung.service';
import { SonderausstattungService } from './sonderausstattung/sonderausstattung.service';
import { MotorleistungService } from './motorleistung/motorleistung.service';
import { Bestellung } from './app-state/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  sonderausstattungCount: number;
  userForm: FormGroup;
  selectedIndex = -1;
  felgenBestellung = '';
  lackierungBestellung = '';
  motorleistungBestellung = '';
  selectedLackierung: any = null;
  title = 'angular-nodejs-example';
  bestellungText = '';
  preisText = 0.0;
  users: any[] = [];
  userCount = 0;
  bestellungCount = 0;
  felgen: any[] = [];
  lackierung: any[] = [];
  motorleistung: any[] = [];
  sonderAusstattungFormArray: FormArray;
  sonderausstattungen: any[] = [];
  filteredSonderausstattungen: any[] = [];
  selectedFelgen: any = null;
  selectedMotorleistung: any = null;
  bestellung: Bestellung = new Bestellung();
  destroy$: Subject<boolean> = new Subject<boolean>();
  felgenPreis = 0.0;
  lackierungPreis = 0.0;
  motorleistungPreis = 0.0;


  constructor(
    private appService: AppService,
    private felgenService: FelgenService,
    private lackierungService: LackierungService,
    private sonderausstattungService: SonderausstattungService,
    private motorleistungService: MotorleistungService,
    
  ) {
    this.userForm = new FormGroup({
      firstName: new FormControl(
        '',
        Validators.nullValidator && Validators.required
      ),
      lastName: new FormControl(
        '',
        Validators.nullValidator && Validators.required
      ),
      email: new FormControl(
        '',
        Validators.nullValidator && Validators.required
      ),
      definition: new FormControl('', Validators.nullValidator),
      preis: new FormControl('', Validators.nullValidator),
      sonderAusstattungFormArray: new FormArray([])
    });
    this.addCheckboxes();
  }


  ngOnInit() {
    this.getAllUsers();
    this.felgenService.getFelgen();
    this.lackierungService.getLackierungen();
    this.getSonderausstattung();
    this.getFelgen();
    this.getLackierungen();
    this.getMotorleistung();
    console.log(this.sonderausstattungFormData.controls);
    console.log(this.sonderausstattungen);
  }

  private addCheckboxes() {
    this.sonderausstattungen.forEach(() =>
      this.sonderausstattungFormData.push(new FormControl(false))
    );
  }

  get sonderausstattungFormData() {
    return this.userForm.controls.sonderAusstattungFormArray as FormArray;
  }

  onSubmit() {
    this.bestellung.definition =  this.bestellungText;
    this.bestellung.preis =  this.preisText;
    this.userForm.value.definition = this.bestellungText;
    this.userForm.value.preis = this.preisText;
    this.appService
      .addUser(this.userForm.value, this.userCount + 1)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
       console.log('message::::', data);
       this.userCount = this.userCount + 1;
       console.log(this.userCount);

      });
    this.appService
     .addBestellung(this.bestellung)
     .pipe(takeUntil(this.destroy$))
       .subscribe((data) => {
        console.log('message::::', data);
        this.userForm.reset();
       });
  }
  deleteUser() {
    this.appService
      .deleteUser(this.userForm.value, this.userCount)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('message::::', data);
        this.userCount = this.userCount - 1;
        console.log(this.userCount);
        this.userForm.reset();
      });
  }

  getAllUsers() {
    this.appService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any[]) => {
        this.userCount = users.length;
        this.users = users;
      });
  }

  onCheckChange(event) {
    const formArray: FormArray = this.userForm.get(
      'sonderAusstattungFormArray'
    ) as FormArray;
    /* Selected */
    let index: number;
    let selectedIndex: number;
    if (event.target.checked) {
      // Add a new control in the arrayForm
      console.log(event.target.value);
      this.bestellungText +=
        this.sonderausstattungen[event.target.value].definition + '\\n';
      this.preisText += this.sonderausstattungen[event.target.value].preis;
      index = event.target.value;
      this.filteredSonderausstattungen.push(this.sonderausstattungen[index]);
      console.log(this.filteredSonderausstattungen);
    } else {
      selectedIndex = event.target.value;
      console.log(selectedIndex);
      console.log(this.sonderausstattungen[selectedIndex].definition);
      this.bestellungText = this.bestellungText.replace(
        this.sonderausstattungen[selectedIndex].definition, ' '
      );
      this.preisText -= this.sonderausstattungen[selectedIndex].preis;
      this.filteredSonderausstattungen.splice(selectedIndex, 1);

      console.log(this.filteredSonderausstattungen);
    }
  }
  onSelectedFelgen( event) {
      this.preisText -= this.felgenPreis;
      this.felgenPreis = 0;
      this.bestellungText = this.bestellungText.replace(this.felgenBestellung, '');
      console.log(event.target);
      this.felgenBestellung = event.target.value;
      this.selectedFelgen = this.felgen.find(obj => {
        return obj.definition === event.target.value;
      });
      this.felgenPreis += this.selectedFelgen.preis;
      this.preisText += this.felgenPreis;
      this.bestellungText += this.felgenBestellung;
      console.log(this.selectedFelgen);

  }

  onSelectedLackierung(event) {
    this.preisText -= this.lackierungPreis;
    this.lackierungPreis = 0;
    this.bestellungText = this.bestellungText.replace(this.lackierungBestellung, '');
    console.log(event.target);
    this.lackierungBestellung = event.target.value;
    this.selectedLackierung = this.lackierung.find(obj => {
        return obj.definition === event.target.value;
      });

    this.bestellungText += this.lackierungBestellung;
    this.lackierungPreis += this.selectedLackierung.preis;
    this.preisText += this.lackierungPreis;
    console.log(this.selectedLackierung);
  }
  onSelectedMotorleistung(event) {
    this.preisText -= this.motorleistungPreis;
    this.motorleistungPreis = 0.0;
    this.bestellungText = this.bestellungText.replace(this.motorleistungBestellung, '');
    console.log(event.target);
    this.motorleistungBestellung = event.target.value;
    this.selectedMotorleistung = this.motorleistung.find(obj => {
        return obj.definition === event.target.value;
      });
    this.motorleistungPreis += this.selectedMotorleistung.preis;
    this.preisText += this.motorleistungPreis;
    this.bestellungText += this.motorleistungBestellung;
    console.log(this.selectedMotorleistung);
  }

  getSonderausstattung() {
    this.sonderausstattungService
      .getSonderausstattungen()
      .pipe(takeUntil(this.destroy$))
      .subscribe((sonderausstattung: any[]) => {
        this.sonderausstattungCount = sonderausstattung.length;
        this.sonderausstattungen = sonderausstattung;
      });
  }

  getFelgen() {
    this.felgenService.getFelgen().pipe(takeUntil(this.destroy$)).subscribe((felgen: any[]) => {
    this.felgen = felgen;
    });
  }

  getLackierungen() {
    this.lackierungService.getLackierungen().pipe(takeUntil(this.destroy$)).subscribe((lackierungen: any[]) => {
      this.lackierung = lackierungen;
    });
  }

  getMotorleistung() {
    this.motorleistungService.getMotorleistung().pipe(takeUntil(this.destroy$)).subscribe((motorleistungen: any []) => {
      this.motorleistung = motorleistungen;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
